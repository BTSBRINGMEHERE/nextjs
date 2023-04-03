import "bootstrap/dist/css/bootstrap.min.css"
import "@/styles/globals.css" // global css는 여기에서만 사용가능 다른 페이지, 컴포넌트에서는 에러발생
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import Head from "next/head"
import { Container, SSRProvider } from "react-bootstrap"
import styles from "@/styles/App.module.css"
import NavBar from "@/components/NavBar"
import NextProgress from "nextjs-progressbar"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={inter.className}>
			{/* head를 여기다 만들어서 헤드 데이터를 글로벌로 사용가능 */}
			<Head>
				<title key="title">NextJS News</title>
				{/* 태그 중복 방지를 위한 key를 title, meta tag에 삽입 */}
				<meta name="description" key="description" content="NextJS begginer course" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NextProgress />
			<SSRProvider>
				<NavBar />
				<Container className={styles.pageContainer}>
					<Component {...pageProps} />
				</Container>
			</SSRProvider>
		</div>
	)
}
