import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import logoIcon from "../../assets/icons/common/logo.svg";
import boyImage from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";
import chatIcon from "../../assets/icons/chat/chat.svg";

interface ReportItem {
  id: number;
  name: string;
  date: string;
  count: number;
  isRecent: boolean;
}

const ChatIntroStep = () => {
  const navigate = useNavigate();

  const mockReports: ReportItem[] = [
    { id: 1, name: "카피바라", date: "5월 7일", count: 3, isRecent: true },
    { id: 2, name: "카카피바라", date: "5월 7일", count: 2, isRecent: false },
    { id: 3, name: "피피바라", date: "5월 7일", count: 1, isRecent: false },
  ];

  return (
    <div className="w-full bg-white font-sans relative min-h-screen">
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-subheadline font-semibold text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">AI 챗봇</h1>
      </div>

      <main className="flex flex-col px-side pb-[40px]">
        <div className="mt-[24px] flex items-start">
          <img
            src={logoIcon}
            alt="AI 로고"
            className="h-[48px] w-[48px] shrink-0"
          />
          <div className="ml-[16px] flex w-[260px] items-center justify-center rounded-br-[20px] rounded-[20px] rounded-tl-none border border-solid border-grey-200 bg-white p-[16px] gap-[10px]">
            <p className="text-[16px] font-[400] leading-[21px] text-black tracking-[-0.41px] whitespace-pre-line">
              성신님, 반가워요 어떤 리포트를 함께 살펴볼까요? 또는 일반적인 육아
              고민도 편하게 이야기해 주세요.
            </p>
          </div>
        </div>

        <h2 className="mt-[40px] text-[17px] font-[600] leading-[22px] text-black tracking-[-0.41px]">
          최근 리포트로 대화 시작하기
        </h2>

        <div className="mt-[16px] flex w-full flex-col gap-[8px]">
          {mockReports.map((report) => (
            <button
              key={report.id}
              onClick={() => navigate(`/chat/report/${report.id}`)}
              className="flex w-[370px] cursor-pointer max-w-full items-center justify-between rounded-[12px] bg-grey-50 p-[12px] text-left transition-colors hover:bg-grey-100"
            >
              <div className="flex items-center">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white p-[9.333px_8.667px_9.667px_9.333px] shrink-0">
                  <img
                    src={boyImage}
                    alt="아이 프로필"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="ml-[8px] flex flex-col">
                  <span className="text-[15px] font-[600] leading-[20px] text-black tracking-[-0.24px]">
                    {report.name}
                  </span>
                  <div className="flex items-center text-[13px] font-[400] text-black tracking-[-0.08px]">
                    <span>{report.date}</span>
                    <span className="mx-[2px]">・</span>
                    <span>{report.count}번째 검사</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[16px]">
                {report.isRecent && (
                  <div className="flex items-center justify-center rounded-[4px] border border-solid border-[#C3DFFD] bg-[#EBF4FE] px-[6px] py-[4px]">
                    <span className="text-[12px] font-[600] leading-[16px] text-[#2E90FA]">
                      최근
                    </span>
                  </div>
                )}
                <img
                  src={chevronIcon}
                  alt="이동하기"
                  className="h-[24px] w-[24px] shrink-0"
                />
              </div>
            </button>
          ))}
        </div>

        <ActionButton
          variant="lightOrange"
          size="lg"
          showIcon={false}
          onClick={() => navigate("/chat/general")}
          className="mt-[16px] w-full gap-[6px] font-[600] tracking-[-0.32px]"
        >
          <img
            src={chatIcon}
            alt="채팅 아이콘"
            className="h-[24px] w-[24px] shrink-0"
          />
          리포트 없이 일반 대화하기
        </ActionButton>
      </main>
    </div>
  );
};

export default ChatIntroStep;
