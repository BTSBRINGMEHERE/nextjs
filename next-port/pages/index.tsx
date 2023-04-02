import { NewsArticle, NewsResponse } from "@/models/NewsArticles"
import { GetServerSideProps } from "next"
import Head from "next/head"

interface BreakingNewsPageProps {
	newsArticles: NewsArticle[]
}

// 환경변수를 사용할 때 서버에서는 그냥 사용해도 되지만 클라이언트에서는 NEXT_PUBLIC 을 붙여야 함 ex) process.env.NEXT_PUBLIC.API_KEY
// 타입스크립트 사용시 서버사이트프롭스 타입을 가져오고 제네릭타입으로 해당 데이터의 타입을 설정
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
	const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY)
	const newsResponse: NewsResponse = await response.json()
	return { props: { newsArticles: newsResponse.articles } }
}

export default function BreakingNewPage({ newsArticles }: BreakingNewsPageProps) {
	return (
		<>
			<Head>
				<title key="title">Breaking News - NextJS News App</title>
			</Head>
			<main>
				<h1>긴급 뉴스</h1>
				{JSON.stringify(newsArticles)}
			</main>
		</>
	)
}
