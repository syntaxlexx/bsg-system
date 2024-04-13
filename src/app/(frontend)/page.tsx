import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div className="container space-y-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4">form</div>

        <div className="w-full md:w-1/4">
          <div className="md:sticky md:top-0">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total:</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
