export interface PostTestRequest {
  child_id: number;
  consent_agreed: boolean;
  test_type: string;
}

export type PostTestResponse = string;

export interface ChildProfile {
  child_id: number;
  name: string;
  birth_year: number;
  age: number;
  gender: "male" | "female";
}

export interface TestProfile {
  test_status: string;
  pdi_status: string;
  test_date: string;
  test_date_label: string;
  test_order: number;
  test_order_label: string;
  consent_agreed: boolean;
  drawing_time_minutes: number;
  original_image_path: string;
  result_image_path: string;
}

export interface SummaryInfo {
  title: string;
  one_line_summary: string;
  summary_text: string;
  main_emotion: string;
  risk_level: string;
  analysis_mode: string;
  pdi_used: boolean;
  confidence_level: string;
  disclaimer: string;
}

export interface TabDetail {
  tags: string[];
  label: string;
  status: string;
  observations: string[];
  positive_note: string;
  interpretation: string;
}

export interface RecommendationItem {
  title: string;
  description: string;
}

export interface ReportDetailResponse {
  report_id: number;
  test_id: number;
  child: ChildProfile;
  test: TestProfile;
  summary: SummaryInfo;
  tabs: {
    house?: TabDetail;
    tree?: TabDetail;
    person?: TabDetail;
  };
  relationship_analysis: {
    observations: string[];
    interpretation: string;
  };
  recommendations: RecommendationItem[];
  safety_notice: string;
  images: {
    original_image_path: string;
    result_image_path: string;
  };
  test_result_images?: {
    all: string;
    tree: string;
    house: string;
    person: string;
    debug_all: string;
  };
  analysis?: {
    yolo_result_json?: {
      result_image_paths?: {
        all: string;
        tree: string;
        house: string;
        person: string;
        debug_all: string;
      };
    };
  };
}

export interface ReportListItem {
  report_id: number;
  test_id: number;
  child_id: number;
  child_name: string;
  birth_year: number;
  age: number;
  gender: "male" | "female";
  test_date: string;
  test_date_label: string;
  test_order: number;
  test_order_label: string;
  test_status: string;
  pdi_status: string;
  summary_text: string;
  main_emotion: string;
  result_image_path: string;
  analysis_mode: "with_pdi" | "without_pdi";
  pdi_used: boolean;
  confidence_level: string;
  created_at: string;
  updated_at: string;
}
