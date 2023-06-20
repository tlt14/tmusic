import Link from "next/link";
import { ICategory, ISong } from "../types/ZingMP3Response.type";

interface IProps {
  category: ICategory;
}
export default function Category({ category }: IProps) {
    
    
  return (
    <div className="mt-10">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
          {category?.title}
        </h2>
        {/* <Link
          href={"/"}
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Tất cả
        </Link> */}
      </div>
      <div className="grid grid-cols-5 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-3">
        {category?.items.map((item: ISong) => {
          return (
            <div
              className="max-w-[214px]  rounded-lg shadow "
              key={item.encodeId}
            >
              <Link href={`/album/${item.encodeId}`}>
                <img className="rounded-lg" src={item.thumbnailM} alt="" />
              </Link>
              <Link href={`/album/${item.encodeId}`} className="py-2">
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 truncate">
                  {item.sortDescription || item.title}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
