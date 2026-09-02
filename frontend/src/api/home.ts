import axiosInstance from "../apis/axiosInstance";

export interface Report {
  test_id: number;
  child_id: number;
  child_name: string;
  test_date: string;
  test_date_label: string;
  test_order: number;
  test_order_label: string;
  main_emotion: string;
}

export interface HomeResponse {
  headline: string;
  child: {
    child_id: number;
    name: string;
  } | null;
  test_card: {
    title: string;
    subtitle: string;
    button_text: string;
    steps: string[];
  };
  chatbot_card: {
    mode: string;
    title: string;
    description: string | null;
    child: { child_id: number; name: string } | null;
    latest_test: {
      test_id: number;
      days_ago: number;
      days_ago_label: string;
      test_order: number;
      test_order_label: string;
    } | null;
    recommended_questions: string[];
    button_text: string;
  };
  recent_reports_card: {
    title: string;
    reports: Report[];
  };
}

export const getHome = () =>
  axiosInstance.get<HomeResponse>("/home").then((r) => r.data);
