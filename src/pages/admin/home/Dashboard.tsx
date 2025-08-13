import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { reviews } from "../../../common/data/data";
import ReviewsTable from "./ReviewsTable";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4 px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            <span className="text-blue-500 cursor-pointer">Customer</span>
            <span className="text-gray-500"> / Review</span>
          </span>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex">
          <TabsList className="flex bg-white gap-16 px-5 mb-6 border-0 shadow-none text-gray-500 rounded-lg">
            <TabsTrigger
              value="all"
              className="rounded-none h-full py-2 border-0 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 data-[state=active]:shadow-none"
            >
              All Reviews
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="rounded-none h-full border-0 data-[state=active]:border-b-2 data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500 relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 data-[state=active]:shadow-none"
            >
              Published
            </TabsTrigger>
            <TabsTrigger
              value="deleted"
              className="rounded-none h-full border-0 data-[state=active]:border-b-2 data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500 relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 data-[state=active]:shadow-none"
            >
              Deleted
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <ReviewsTable data={reviews} />
        </TabsContent>
        <TabsContent value="published">
          <ReviewsTable data={reviews.filter((r) => r.status === "approved")} />
        </TabsContent>
        <TabsContent value="deleted">
          <ReviewsTable data={reviews.filter((r) => r.status === "archived")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
