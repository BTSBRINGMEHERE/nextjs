import { NewsArticle } from "@/models/NewsArticles"

interface NewsArticleEntryProps {
	article: NewsArticle
}

const NewsArticleEntry = ({ article: { title, description, url, urlToImage } }: NewsArticleEntryProps) => {
	const validImageUrl = urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://") ? urlToImage : undefined

	return <></>
}

export default NewsArticleEntry
