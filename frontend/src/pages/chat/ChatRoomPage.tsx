import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { ReportSummaryCard } from "../../components/chat/ReportSummaryCard";
import { ReportBottomSheet } from "../../components/chat/ReportBottomSheet";
import { ChatInputBar } from "../../components/chat/ChatInputBar";

import returnIcon from "../../assets/icons/common/return.svg";
import logoIcon from "../../assets/icons/common/logo.svg";
import searchIcon from "../../assets/icons/common/search.svg";
import thinkingIcon from "../../assets/icons/chat/thinking.svg";

import { useAppQuery, useAppMutation } from "../../hooks/apiHooks";
import {
  getChatHistory,
  sendChatMessage,
  getSuggestedPrompts,
  getChatSessions,
  createChatSession,
} from "../../apis/chat/chat";
import { getReports } from "../../apis/test/test";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export interface CurrentReportType {
  id: number;
  name: string;
  date: string;
  orderLabel: string;
}

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { reportId } = useParams<{ reportId: string }>();

  const numericSessionId = (() => {
    if (!reportId) return 0;
    if (reportId.startsWith("{")) {
      try {
        const parsed = JSON.parse(reportId);
        return Number(parsed.session_id || parsed.id) || 0;
      } catch (e) {}
    }
    return Number(reportId) || 0;
  })();

  const hasReport = location.state?.hasReport ?? numericSessionId !== 0;

  const [currentReport, setCurrentReport] = useState<CurrentReportType | null>(
    null,
  );
  const [inputValue, setInputValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const hasAutoSent = useRef(false);

  const { data: rawReports = [] } = useAppQuery<any[]>(
    ["reports"],
    getReports,
    { staleTime: 0 },
  );

  const reportList = useMemo(() => {
    return rawReports.map((r: any) => ({
      id: r.report_id,
      name: r.child_name,
      date: r.test_date_label,
      orderLabel: r.test_order_label,
    }));
  }, [rawReports]);

  const { data: sessionList = [] } = useAppQuery<any>(
    ["chatSessions"],
    getChatSessions,
    { staleTime: 0 },
  );

  const { mutate: handleStartNewChat } = useAppMutation<
    any,
    { child_id: number; htp_test_id: number; title: string }
  >((body) => createChatSession(body), {
    onSuccess: (response, variables) => {
      let parsedResponse = response;
      if (typeof response === "string") {
        try {
          parsedResponse = JSON.parse(response);
        } catch (e) {}
      }

      const createdRoomId =
        parsedResponse && typeof parsedResponse === "object"
          ? parsedResponse.session_id || parsedResponse.id
          : parsedResponse;

      if (createdRoomId) {
        navigate(`/chat/report/${createdRoomId}`, {
          state: { hasReport: true, reportId: variables.htp_test_id },
          replace: true,
        });
      }
    },
    onError: (error) => {
      console.error(error);
      alert("채팅방을 생성하지 못했습니다. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (hasReport && reportList.length > 0) {
      const stateReportId = location.state?.reportId;
      if (stateReportId) {
        const matchedReport = reportList.find(
          (r) => r.id === Number(stateReportId),
        );
        if (matchedReport) {
          setCurrentReport(matchedReport);
          return;
        }
      }

      let parsedSessions = sessionList;
      if (typeof sessionList === "string") {
        try {
          parsedSessions = JSON.parse(sessionList);
        } catch (e) {
          parsedSessions = [];
        }
      }
      const sessionsArray = Array.isArray(parsedSessions)
        ? parsedSessions
        : parsedSessions?.data || [];

      const currentSession = sessionsArray.find(
        (s: any) => (s.session_id || s.id) === numericSessionId,
      );

      if (currentSession?.htp_test_id) {
        const matchedReport = reportList.find(
          (r) => r.id === currentSession.htp_test_id,
        );
        if (matchedReport) {
          setCurrentReport(matchedReport);
          return;
        }
      }

      setCurrentReport((prev) => {
        if (!prev) return reportList[0];
        return prev;
      });
    }
  }, [hasReport, reportList, sessionList, numericSessionId, location.state]);

  const { data: historyData, error: historyError } = useAppQuery<any>(
    ["chatHistory", numericSessionId],
    () => getChatHistory(numericSessionId),
    {
      enabled: numericSessionId !== 0,
    },
  );

  useEffect(() => {
    if (historyError) {
      console.error(historyError);
    }
    if (historyData) {
      console.log(historyData);
    }
  }, [historyData, historyError]);

  const { data: suggestedPromptsData } = useAppQuery<any>(
    ["suggestedPrompts", hasReport, numericSessionId],
    () =>
      getSuggestedPrompts({
        context: hasReport ? "report" : "general",
        htp_test_id: hasReport ? numericSessionId : null,
      }),
    {
      enabled: numericSessionId !== 0 || !hasReport,
    },
  );

  const parseArrayOrObjectHistory = (data: any) => {
    let parsedData = data;
    if (typeof parsedData === "string") {
      try {
        parsedData = JSON.parse(parsedData);
      } catch (e) {}
    }

    let targetArray = [];
    if (Array.isArray(parsedData)) {
      targetArray = parsedData;
    } else if (typeof parsedData === "object" && parsedData !== null) {
      targetArray =
        parsedData.messages ||
        parsedData.history ||
        parsedData.data ||
        parsedData.chat_history ||
        parsedData.items ||
        Object.values(parsedData).find(Array.isArray) ||
        [];
    }

    if (Array.isArray(targetArray) && targetArray.length > 0) {
      const formattedMessages: Message[] = [];

      targetArray.forEach((item: any, idx: number) => {
        const hasUserContent =
          item.user_message || item.question || item.prompt;
        const hasAiContent =
          item.assistant_message || item.answer || item.bot_message;

        if (hasUserContent && hasAiContent && !item.role && !item.sender) {
          formattedMessages.push({
            id: String(item.id || item.message_id || idx) + "-user",
            text:
              typeof hasUserContent === "string"
                ? hasUserContent
                : hasUserContent.content || "",
            sender: "user",
          });
          formattedMessages.push({
            id: String(item.id || item.message_id || idx) + "-ai",
            text:
              typeof hasAiContent === "string"
                ? hasAiContent
                : hasAiContent.content || "",
            sender: "ai",
          });
          return;
        }

        const isUser =
          item.role === "user" || item.sender === "user" || !!item.user_message;

        const textContent =
          item.answer ||
          item.content ||
          item.message ||
          item.text ||
          item.user_message?.content ||
          item.assistant_message?.content ||
          (typeof item === "string" ? item : "");

        if (textContent) {
          formattedMessages.push({
            id: String(item.message_id || item.id || idx),
            text: textContent,
            sender: isUser ? "user" : "ai",
          });
        }
      });

      setMessages(formattedMessages);
    }
  };

  useEffect(() => {
    if (!historyData) return;

    if (typeof historyData === "string") {
      let trimmedData = historyData.trim();
      if (!trimmedData) return;

      if (trimmedData.startsWith('"') && trimmedData.endsWith('"')) {
        try {
          trimmedData = JSON.parse(trimmedData);
        } catch (e) {}
      }

      if (trimmedData.startsWith("[") || trimmedData.startsWith("{")) {
        try {
          const parsed = JSON.parse(trimmedData);
          parseArrayOrObjectHistory(parsed);
          return;
        } catch (e) {
          console.error("채팅 내역 JSON 파싱 에러:", e);
        }
      }

      if (trimmedData.includes("\n")) {
        const lines = trimmedData.split("\n");
        const parsedMessages: Message[] = lines.map((line, idx) => {
          const isUser = line.startsWith("User:") || line.startsWith("유저:");
          const cleanText = line.replace(/^(User:|AI:|유저:|챗봇:)\s*/i, "");

          return {
            id: `history-${idx}`,
            text: cleanText || line,
            sender: isUser ? "user" : "ai",
          };
        });
        setMessages(parsedMessages);
      } else {
        setMessages([
          {
            id: "history-single",
            text: trimmedData,
            sender: "ai",
          },
        ]);
      }
    } else {
      parseArrayOrObjectHistory(historyData);
    }
  }, [historyData]);

  const { mutate: handleSendMessageApi } = useAppMutation<any, any>(
    (variables: { text: string }) =>
      sendChatMessage(numericSessionId, {
        message: variables.text,
        report_id: currentReport?.id || 0,
      }),
    {
      onSuccess: (response) => {
        setIsAiThinking(false);

        let responseText = "";
        if (response && typeof response === "object") {
          const lastAssistantMessage = Array.isArray(response.messages)
            ? [...response.messages]
                .reverse()
                .find((m: any) => m?.role === "assistant")
            : undefined;

          responseText =
            response.answer ||
            response.assistant_message?.content ||
            response.message ||
            response.content ||
            response.last_message ||
            lastAssistantMessage?.content ||
            JSON.stringify(response);
        } else {
          responseText = response;
        }

        const aiMessage: Message = {
          id: Date.now().toString(),
          text: responseText || "답변을 받아오지 못했습니다.",
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiMessage]);

        queryClient.invalidateQueries({
          queryKey: ["chatHistory", numericSessionId],
        });
      },
      onError: (error) => {
        setIsAiThinking(false);
        console.error(error);
        alert("메시지 전송에 실패했습니다. 다시 시도해 주세요.");
      },
    },
  );

  const dynamicQuestions: string[] = (() => {
    if (!suggestedPromptsData) {
      return hasReport
        ? [
            "민준이 또래는 보통 어떤가요?",
            "이번 검사 결과를 쉽게 설명해 주세요",
            "함께할 활동을 추천해주세요",
            "지난 검사와 비교하면 어떤가요?",
          ]
        : [
            "HTP 검사가 뭔가요?",
            "아이가 그림을 잘 안 그리려고 해요",
            "요즘 아이가 부쩍 짜증을 내요",
          ];
    }

    if (
      Array.isArray(suggestedPromptsData) &&
      suggestedPromptsData.length > 0
    ) {
      return suggestedPromptsData;
    }

    if (typeof suggestedPromptsData === "string") {
      try {
        const parsed = JSON.parse(suggestedPromptsData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        if (suggestedPromptsData.includes("\n")) {
          return suggestedPromptsData.split("\n").filter(Boolean);
        }
        return [suggestedPromptsData];
      }
    }

    if (typeof suggestedPromptsData === "object") {
      const target = suggestedPromptsData.data || suggestedPromptsData.prompts;
      if (Array.isArray(target) && target.length > 0) {
        return target;
      }
    }

    return hasReport
      ? [
          "민준이 또래는 보통 어떤가요?",
          "이번 검사 결과를 쉽게 설명해 주세요",
          "함께할 활동을 추천해주세요",
          "지난 검사와 비교하면 어떤가요?",
        ]
      : [
          "HTP 검사가 뭔가요?",
          "아이가 그림을 잘 안 그리려고 해요",
          "요즘 아이가 부쩍 짜증을 내요",
        ];
  })();

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsAiThinking(true);

    handleSendMessageApi({ text });
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleStopThinking = () => {
    setIsAiThinking(false);
  };

  useEffect(() => {
    const initialQuestion = location.state?.initialQuestion;

    if (
      initialQuestion &&
      !hasAutoSent.current &&
      (currentReport || !hasReport)
    ) {
      const timer = setTimeout(() => {
        hasAutoSent.current = true;
        sendMessage(initialQuestion);
        navigate(location.pathname, {
          state: { ...location.state, initialQuestion: undefined },
          replace: true,
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state, currentReport, numericSessionId, hasReport]);

  const handleSelectReport = (report: CurrentReportType) => {
    setIsBottomSheetOpen(false);

    if (currentReport?.id === report.id) return;

    setCurrentReport(report);
    setMessages([]);
    setInputValue("");
    setIsAiThinking(false);

    let parsedSessions = sessionList;
    if (typeof sessionList === "string") {
      try {
        parsedSessions = JSON.parse(sessionList);
      } catch (e) {}
    }
    const sessionsArray = Array.isArray(parsedSessions)
      ? parsedSessions
      : parsedSessions?.data || [];

    const existingSession = sessionsArray.find(
      (session: any) => session.htp_test_id === report.id,
    );

    if (existingSession) {
      const sessionId = existingSession.session_id || existingSession.id;
      navigate(`/chat/report/${sessionId}`, {
        state: { hasReport: true, reportId: report.id },
        replace: true,
      });
    } else {
      const targetRawReport = rawReports.find(
        (r: any) => r.report_id === report.id,
      );
      const childId = targetRawReport?.child_id || 0;

      handleStartNewChat({
        child_id: childId,
        htp_test_id: report.id,
        title: `${report.name} 리포트 상담`,
      });
    }
  };

  return (
    <div className="w-full bg-white font-sans relative min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[402px] bg-white min-h-screen flex flex-col relative shadow-sm">
        <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
          <img
            src={returnIcon}
            alt="뒤로가기"
            onClick={() => navigate(-1)}
            className="h-[14px] w-[14px] cursor-pointer"
          />
          <h1 className="text-e-title-3 text-grey-900 font-sans">AI 챗봇</h1>
        </div>

        <main className="flex-1 flex flex-col items-center px-side pb-[140px] overflow-y-auto w-full">
          {hasReport && currentReport && (
            <ReportSummaryCard
              name={currentReport.name}
              date={currentReport.date}
              orderLabel={currentReport.orderLabel}
              onChangeClick={() => setIsBottomSheetOpen(true)}
              onViewAllClick={() =>
                navigate(`/test-result?reportId=${currentReport.id}`)
              }
            />
          )}

          {messages.length === 0 && (
            <>
              <div className="mt-[40px] flex flex-col items-center">
                <img
                  src={logoIcon}
                  alt="AI 로고"
                  className="w-[96px] h-[96px] object-contain"
                />

                <h2 className="mt-[16px] text-center text-e-title-3 text-black font-sans whitespace-pre-line">
                  {hasReport && currentReport
                    ? `${currentReport.name}의 \n${currentReport.date} 리포트를 함께 보고있어요.\n어떤 부분부터 이야기해볼까요?`
                    : `안녕하세요,\n육아 고민이나 궁금한 점을\n편하게 물어보세요`}
                </h2>
              </div>

              <div className="mt-[24px] flex flex-col w-full gap-[8px] items-center">
                {dynamicQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(question)}
                    className="flex cursor-pointer px-[16px] py-[8px] justify-center items-center gap-[10px] rounded-[1000px] bg-grey-100 hover:bg-grey-200/50 transition-colors"
                  >
                    <img
                      src={searchIcon}
                      alt="검색"
                      className="w-[24px] h-[24px] shrink-0"
                    />
                    <span className="text-subheadline text-grey-800 font-sans">
                      {question}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {messages.length > 0 && (
            <div className="w-full mt-[24px] flex flex-col gap-[28px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`w-full flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <img
                      src={logoIcon}
                      alt="AI 로고"
                      className="w-[32px] h-[32px] object-contain shrink-0 mr-[8px]"
                    />
                  )}
                  <div
                    className={`p-[12px_16px] text-subheadline font-[400] max-w-[260px] break-words whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-main-100 text-black rounded-[20px] rounded-tr-[4px]"
                        : "bg-grey-100 text-grey-900 rounded-[20px] rounded-tl-[4px]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="w-full flex items-center mt-[28px]">
                  <img
                    src={logoIcon}
                    alt="AI 로고"
                    className="w-[48px] h-[48px] object-contain shrink-0"
                  />
                  <span
                    className="ml-[9px] text-grey-500 text-body-2 font-sans"
                    style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                  >
                    생각하고 있어요
                  </span>
                </div>
              )}
            </div>
          )}
        </main>

        {isAiThinking ? (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] bg-white p-[16px_16px_34px_16px] flex items-center gap-[12px] z-40">
            <div className="flex-1 bg-white border border-grey-200 rounded-[8px] p-[15px_16px] text-body-1 font-sans text-grey-400">
              {inputValue || "메시지를 입력해주세요"}
            </div>
            <button
              onClick={handleStopThinking}
              className="flex w-[52px] h-[52px] justify-center items-center shrink-0 rounded-full bg-[#FF6229] transition-colors"
            >
              <img
                src={thinkingIcon}
                alt="생각 중단"
                className="w-[32px] h-[32px] shrink-0"
              />
            </button>
          </div>
        ) : (
          <ChatInputBar
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
          />
        )}

        <ReportBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          reports={reportList}
          onSelectReport={handleSelectReport}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
