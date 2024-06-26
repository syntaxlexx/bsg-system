import { Title } from "@/components";

interface Props {}

const Page = ({}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Title text="Welcome" />
      </div>
      Page
    </div>
  );
};

export default Page;
