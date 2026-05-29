import apiClient from './client';

export interface Report {
  report_id: number;
  child_name: string;
  tested_at: string;
  test_number?: number;
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
    description: string;
    child: { child_id: number; name: string } | null;
    latest_test: { tested_at: string; test_number: number } | null;
    recommended_questions: string[];
    button_text: string;
  };
  recent_reports_card: {
    title: string;
    reports: Report[];
  };
}

export const getHome = () =>
  apiClient.get<HomeResponse>('/home').then((r) => r.data);
