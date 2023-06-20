import { GetStaticProps } from "next"
import { ICategory, Top100Response, ZingMp3Response } from "../../src/types/ZingMP3Response.type"
import Category from "../components/Category"
import Head from "next/head"

interface IProps {
    outstanding : ICategory,
    vPop : ICategory ,
    asianMusic: ICategory,
    USMusic: ICategory,
    concert: ICategory,
}
export default function Top100({outstanding, vPop, asianMusic, USMusic, concert}: IProps) {
    console.log(outstanding)
    return (
        <>
            <Head>
                <title>Top100 | Tuyển tập nhạc hay chọn lọc</title>
                <meta name="description" content={outstanding.title} />
                <link rel="icon" href="https://static-zmp3.zmdcdn.me/skins/zmp3-v5.2/images/icon_zing_mp3_60.png" />
            </Head>
            <Category category={outstanding}/>
            <Category category={vPop}/>
            <Category category={asianMusic}/>
            <Category category={USMusic}/>
            <Category category={concert}/>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(
        "http://localhost:3000/api/top100"
    )
    const result: ZingMp3Response = await res.json()
    const data: Top100Response[] = result.data
    
    return {
        props: {
            outstanding : data[0],
            vPop : data[1] ,
            asianMusic: data[2],
            USMusic: data[3],
            concert: data[4],
        },
    }
}