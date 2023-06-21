import Head from "next/head";
import dynamic from "next/dynamic";
import { getTop100 } from "@/src/service/zingmp3.service";
import { ICategory, Top100Response, ZingMp3Response } from "../../src/types/ZingMP3Response.type";
import { GetStaticProps } from "next";

const Category = dynamic(() => import("@/src/components/Category"), { ssr: false });

interface IProps {
  categories: ICategory[];
}

export default function Top100({ categories }: IProps) {
  return (
    <>
      <Head>
        <title>Top100 | Tuyển tập nhạc hay chọn lọc</title>
        <meta name="description" content={categories[0].title} />
        <link
          rel="icon"
          href="https://static-zmp3.zmdcdn.me/skins/zmp3-v5.2/images/icon_zing_mp3_60.png"
        />
      </Head>
      {categories.map((category, index) => (
        <Category category={category} key={index} />
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const result: ZingMp3Response = await getTop100();
  const data: Top100Response[] = result.data;
  const categories = data.slice(0, 5); // Only take top 5 categories

  return {
    props: {
      categories,
    },
  };
};
