export interface ILambda {
  id: string
  library_id: string
  name: string
  body: string
}

export interface IEvent {
  session_variables: { 'x-hasura-role': string }
  op: 'INSERT' | 'UPDATE' | 'DELETE'
  trace_context: { trace_id: number; span_id: number }
}

export interface IInsertLambdaEvent extends IEvent {
  data: { old: any; new: ILambda }
}

export interface IEventTrigger {
  event: IInsertLambdaEvent
  created_at: string
  id: string
  delivery_info: { max_retries: number; current_retry: number }
  trigger: { name: string }
  table: { schema: string; name: string }
}
