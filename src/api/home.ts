import apiClient from './client';

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
    child: any;
    latest_test: any;
    recommended_questions: string[];
    button_text: string;
  };
  recent_reports_card: {
    title: string;
    reports: any[];
  };
}

export const getHome = () =>
  apiClient.get<HomeResponse>('/home').then((r) => r.data);
