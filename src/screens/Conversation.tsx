import Card, { Paragraph, Title } from "../components/card";
import Header from "../components/header";
import { HiMiniSignal } from "react-icons/hi2";

export default function Conversation() {
  return (
    <div className="p-5">
      <Header />

      <div className="text-center">
        <Card>
          <Title>Vennt Conversations 🌟</Title>
          <Paragraph>
            Kindness goes a long way. Share your thoughts, lend an ear, and
            create a supportive atmosphere.
          </Paragraph>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center py-10">
        <HiMiniSignal className="text-[10em] text-[var(--accent)] animate-pulse" />
        <h3 className="text-center opacity-60">
          Finding the perfect match for your conversation. Please hold on!
        </h3>
      </div>
    </div>
  );
}
