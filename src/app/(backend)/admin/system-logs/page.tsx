import { Title } from "@/components";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Title text="System Logs" />
      </div>
      Page
    </div>
  );
};

export default Page;
