export interface LessonEntity {
    actionType?: string;
    id: string;
    user_id: number,
    course_id: number,
    parent_id: number,
    level: number,
    status: number,
    childrent_type: number,
    start_time: number,
    end_time: number,
    tag: string,
    sort_id: number,
    order_index: number,
    user_name: string,
    name: string,
    description: string,
    short_description: string,
    avatar: string,
    total_card_num: number,
    question_number: number,
    password: string,
    duration: number,
    pass: number,
    time_practice: number,
    score_scale: number,
};
