import * as amqp from 'amqplib';
import { EventPublisher } from '../../domain/events/EventPublisher';

type Conn = amqp.Connection & { createChannel(): Promise<amqp.Channel> };

export class RabbitMQEventPublisher implements EventPublisher {
  private readonly exchange = 'readup.events';
  private connection?: Conn;
  private channel?: amqp.Channel;

  private async ensureConnection(): Promise<void> {
    if (this.connection && this.channel) return;

    this.connection = (await amqp.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost',
    )) as unknown as Conn;

    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
  }

  async publish(routingKey: string, payload: unknown): Promise<void> {
    await this.ensureConnection();
    this.channel!.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true }
    );
  }
}
