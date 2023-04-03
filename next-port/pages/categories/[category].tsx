import NewsArticleGrid from "@/components/NewsArticleGrid"
import { NewsArticle, NewsResponse } from "@/models/NewsArticles"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Alert } from "react-bootstrap"

interface CategoryNewsPageProps {
	newsArticles: NewsArticle[]
}

//paths는 path의 페이지들을 빌드 타임에 생성할지 정하는 배열 현재는 categorySlugs이 선언이 됨
//아래 getStaticProps에 들어갈 파라미터의 카테고리를 선언을 해줌
//fallback: false일 경우 이 카테고리를 제외한 부분을 404에러로 처리함 true일 경우 빌드타임에 생성되지 않는 부분을 선언을 해줌
//true일 경우 당연하게 파일이 존재하거나 해당 api호출시 value가 존재할 때만 빌드 타임때 생성이 된다.
export const getStaticPaths: GetStaticPaths = async () => {
	const categorySlugs = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

	const paths = categorySlugs.map((slug) => ({ params: { category: slug } }))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
	const category = params?.category?.toString()
	const response = await fetch(
		`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
	)
	const newsResponse: NewsResponse = await response.json()
	return {
		props: {
			newsArticles: newsResponse.articles,
		},
		revalidate: 5 * 60, // 5분 이하의 데이터를 표시, 지나면 데이터 재생성 -> 즉, 5분 안에 들어갔다 나왔다 해도 기존의 데이터가 보임 5분이 지나면 다시 재생성
	}

	// 에러가 발생하면 페이지 500을 보여줌
}

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
	const router = useRouter()
	const categoryName = router.query.category?.toString()

	const title = "Category: " + categoryName

	return (
		<>
			<Head>
				<title key="title">{`${title} - NextJS News App`}</title>
			</Head>
			<main>
				<h1>{title}</h1>
				<Alert>
					This is page uses <strong>getStaticProps</strong> for very high page loading speed and{" "}
					<strong>incremental static regeneration</strong> to show data not older than <strong>5 minutes</strong>.
				</Alert>
				<NewsArticleGrid articles={newsArticles} />
			</main>
		</>
	)
}

export default CategoryNewsPage
