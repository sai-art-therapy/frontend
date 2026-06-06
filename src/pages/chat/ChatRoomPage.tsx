import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
} from "../../apis/chat/chat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { reportId } = useParams<{ reportId: string }>();
  const numericSessionId = Number(reportId) || 0;

  const hasReport = location.state?.hasReport ?? numericSessionId !== 0;

  const [currentReport, setCurrentReport] = useState({
    name: "박카피",
    date: "5월 7일",
    count: 3,
  });
  const [inputValue, setInputValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const { data: historyData } = useAppQuery<any>(
    ["chatHistory", numericSessionId],
    () => getChatHistory(numericSessionId),
    {
      enabled: numericSessionId !== 0,
    },
  );

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

  useEffect(() => {
    if (!historyData) return;

    if (typeof historyData === "string") {
      const trimmedData = historyData.trim();
      if (!trimmedData) return;

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
    } else if (typeof historyData === "object" && !Array.isArray(historyData)) {
      const targetArray = historyData.messages || historyData.history || [];

      if (Array.isArray(targetArray)) {
        const formattedMessages: Message[] = targetArray.map(
          (item: any, idx: number) => {
            const isUser = item.role === "user" || !!item.user_message;
            const textContent =
              item.answer ||
              item.content ||
              item.message ||
              item.user_message?.content ||
              item.assistant_message?.content ||
              "";

            return {
              id: String(item.message_id || item.id || idx),
              text: textContent,
              sender: isUser ? "user" : "ai",
            };
          },
        );
        setMessages(formattedMessages);
      }
    } else if (Array.isArray(historyData)) {
      const formattedMessages: Message[] = historyData.map(
        (item: any, idx: number) => {
          const isUser = item.sender === "user" || item.role === "user";
          const textContent =
            item.answer ||
            item.message ||
            item.text ||
            item.content ||
            String(item);

          return {
            id: String(item.id || idx),
            text: textContent,
            sender: isUser ? "user" : "ai",
          };
        },
      );
      setMessages(formattedMessages);
    }
  }, [historyData]);

  const { mutate: handleSendMessageApi } = useAppMutation<any, any>(
    (variables: { text: string }) =>
      sendChatMessage(numericSessionId, {
        message: variables.text,
        report_id: 0,
      }),
    {
      onSuccess: (response) => {
        setIsAiThinking(false);

        let responseText = "";

        if (response && typeof response === "object") {
          responseText =
            response.answer ||
            response.assistant_message?.content ||
            response.message ||
            response.content ||
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
      },
      onError: (error) => {
        setIsAiThinking(false);
        console.error("메시지 전송 실패:", error);
        alert("메시지 전송에 실패했습니다. 다시 시도해 주세요.");
      },
    },
  );

  const mockReportList = [
    { name: "카피바라", date: "5월 7일", count: 3 },
    { name: "카카바라", date: "5월 7일", count: 2 },
    { name: "피피바라", date: "5월 7일", count: 1 },
  ];

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
          {hasReport && (
            <ReportSummaryCard
              name={currentReport.name}
              date={currentReport.date}
              count={currentReport.count}
              onChangeClick={() => setIsBottomSheetOpen(true)}
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
                  {hasReport
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
                    className={`inline-flex p-[16px] justify-center items-center gap-[10px] text-subheadline font-[400] ${
                      msg.sender === "user"
                        ? "bg-main-100 text-black"
                        : "bg-grey-100 text-grey-900"
                    }`}
                    style={{ borderRadius: "1000px" }}
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
          reports={mockReportList}
          onSelectReport={(report) => {
            setCurrentReport(report);
            setIsBottomSheetOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
