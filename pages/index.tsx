import Banner from './components/Banner'
import Category from './components/Category'
import NewRelease from './components/NewRealase'
import { IBanner, ICategory,  INewRealease, ZingMp3Response } from './types/ZingMP3Response.type'



export default function Home({data}:ZingMp3Response ) {
  // getdata banner from data
  const banner:IBanner = data.data.items?.filter((item: any) => item.sectionType==='banner')[0]
  // getdata new release from data
  const newRelease:INewRealease = data.data.items?.filter((item: any) => item.sectionType==='new-release')[0]
  // getdata category chill from data
  const chillCategory:ICategory = data.data.items?.filter((item: any) => item.title==='Chill')[0]
  // getdata category happy weekend from data
  const happyWeekend:ICategory = data.data.items?.filter((item: any) => item.title==='Happy weekend')[0]
  // getdata category Nghệ sĩ thịnh hành from data
  const artists:ICategory = data.data.items?.filter((item: any) => item.title==='Nghệ sĩ thịnh hành')[0]
  return (
      <>
        <Banner banner={banner}/>
        <NewRelease newRelease={newRelease}/>
        <Category category={chillCategory}/>
        {happyWeekend && <Category category={happyWeekend}/>} 
        <Category category={artists}/>
      </>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/home')
  const data: ZingMp3Response = await res.json()

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}