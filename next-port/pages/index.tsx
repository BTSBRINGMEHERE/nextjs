import NewsArticleEntry from "@/components/NewsArticleEntry"
import NewsArticleGrid from "@/components/NewsArticleGrid"
import { NewsArticle, NewsResponse } from "@/models/NewsArticles"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { Alert } from "react-bootstrap"

interface BreakingNewsPageProps {
	newsArticles: NewsArticle[]
}

// 환경변수를 사용할 때 서버에서는 그냥 사용해도 되지만 클라이언트에서는 NEXT_PUBLIC 을 붙여야 함 ex) process.env.NEXT_PUBLIC.API_KEY
// 타입스크립트 사용시 서버사이트프롭스 타입을 가져오고 제네릭타입으로 해당 데이터의 타입을 설정
// 하지만 여기는 서버에서 관리하는 부분이라서 그냥 사용함
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
	// await new Promise((r) => setTimeout(r, 3000))
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
				<Alert>
					This page uses <strong>getServerSideProps</strong> to fetch data server-side on every request. This allows
					search engines to crawl the page content and <strong>inproves SEO</strong>.
				</Alert>
				<NewsArticleGrid articles={newsArticles} />
			</main>
		</>
	)
}
