export interface EventPublisher {
  publish(routingKey: string, payload: any): Promise<void>;
}
