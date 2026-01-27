export interface OfferType {
    id: string;
    external_id: string;
    service_request: string;
    provider_id: string;
    provider_name: string;
    specialist_id: string;
    specialist_name: string;
    status: string;
    daily_rate: string | number;
    travel_cost: string | number;
    total_cost: string | number;
    notes: string;
    title: string;
    role: string;
    duration: string;
    created_at: string;
    updated_at: string;
}

export interface ServiceRequestType {
    id: string;
    title: string;
    role_name: string;
    technology: string;
    specialization: string;
    experience_level: string;
    start_date: string;
    end_date: string;
    expected_man_days: string;
    criteria_json: string;
    status: string;
    task_description: string;
    offer_deadline: string;
    process_id?: string;
    created_at: string;
    updated_at: string;
}

export interface ServiceOrder {
  id: string;
  title: string;
  // service_request_id: string;
  // winning_offer_id: string;
  // contract_id: string | null;
  supplier_name: string;
  current_specialist_id: string;
  current_specialist_name: string;
  original_specialist_id: string;
  original_specialist_name: string;
  role: string;
  // domain: string;
  start_date: string;
  current_end_date: string;
  original_end_date: string;
  // actual_end_date: string;
  current_man_days: number;
  consumed_man_days: number;
  remaining_man_days: number;
  daily_rate: number;
  current_contract_value: number;
  original_contract_value: number;
  has_been_extended: boolean;
  has_been_substituted: boolean;
  status: string;
  pending_extension_id?: string | null;
  pending_substitution_id?: string | null;
  pm_pending_subid?: string | null;
}

export interface ExtensionType {
  id: string;
  service_order_title: string;
  service_order_current_end_date: string;
  status: string;
  additional_man_days: number;
  new_end_date: string;
  additional_cost: string;
  reason: string;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
  service_order: string;
}

export interface SubstitutionType {
  id: string;
  service_order_title: string;
  initiated_by: string;
  status: string;
  outgoing_specialist_id: string;
  outgoing_specialist_name: string;
  incoming_specialist_id: string;
  incoming_specialist_name: string;
  incoming_specialist_daily_rate: string;
  reason: string;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
  service_order: string;
}

export interface SpecialistDetails {
  id: string;
  provider: string;
  provider_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialist_code: string;
  role_name: string;
  experience_level: 'LEAD' | 'EXPERT' | 'SENIOR' | 'MID' | 'JUNIOR';
  skills: string;
  certifications: string;
  specialization: string;
  avg_daily_rate: string;
  status: string;
  available_from: string;
  available_until: string | null;
  max_weekly_hours: number;
  location: string;
  work_mode: string;
  willing_to_travel: boolean;
  languages_spoken: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}