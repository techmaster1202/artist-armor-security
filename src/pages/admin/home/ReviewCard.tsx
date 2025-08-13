import { Star } from "lucide-react";
import React from "react";
import { Review } from "../../../common/data/data";

const tagColors: Record<string, string> = {
  "BAD SERVICE": "bg-red-100 text-red-800",
  UNEXPECTED: "bg-orange-100 text-orange-800",
  GREAT: "bg-blue-100 text-blue-800",
  EXCELLENT: "bg-indigo-100 text-indigo-800",
  "BEST SERVICE": "bg-green-100 text-green-800",
};

export function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = React.useState(false);

  const maxLength = 120;
  const displayComment =
    review.comment.length > maxLength && !expanded
      ? `${review.comment.substring(0, maxLength)}...`
      : review.comment;

  return (
    <div className="bg-white rounded-2xl hover:shadow-md hover:bg-gray-50 p-4 grid grid-cols-1 lg:grid-cols-4">
      {/* Header */}
      <div className="flex gap-3 items-center">

        <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
        <div className="w-[300px]">
          <p className="text-sm text-blue-600 font-semibold">
            {review.customerCode}
          </p>
          <p className="font-semibold text-gray-800">{review.customerName}</p>
          <p className="text-xs text-gray-500">Join on {review.date}</p>
        </div>
      </div>

      {/* Comment */}
      <div className="col-span-2 flex flex-col gap-4">
        <p className="text-sm text-gray-700">
          {displayComment}
          {review.comment.length > maxLength && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 ml-1 hover:underline"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {review.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                tagColors[tag] || "bg-gray-100 text-gray-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{review.rating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">

          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 text-sm">
            Archive
          </button>
          <button className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 text-sm">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
