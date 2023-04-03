# NextJS News
NextJS를 이용한 간단한 뉴스 페이지 만들기!!

## 사용한 기술
> NextJS, TypeScript, Module CSS, Vercel
[Breaking News](https://nextjs-btsbringmehere.vercel.app/) <- 배포사이트

## 프레임워크
NextJS
```
npx create-next-app@latest --ts
```

## 사용이유
- React 프레임워크인 NextJS에 대한 공부가 필요했습니다.
- SSR(Server Side Rendering)과 SSG(Static Site Generation)에 대한 실습이 필요해서 사용했습니다.
- 기존 React와 Next의 차이를 알고싶었습니다.

## NextJS에 대한 공부
1. 기존 React와의 차이점
  - 컴포넌트 구성에 큰 차이가 있었습니다. React는 자유롭게 커스터마이징이 가능하지만 Next는 정해진 규격이 있습니다. 프로젝트를 진행 할 때 Next가 더 편할 것 같습니다.
  - React는 CSR이고 Next는 SSR을 합니다. SSR은 서버 단에서 미리 DOM요소들을 빌드하여 HTML문서를 렌더링 합니다. 이것을 pre-rendering이라 부릅니다.
2. getServerSideProps
  - 페이지에서 getServerSideProps 함수를 export하는 경우 NextJS는 getServerSideProps가 반환하는 데이터를 사용하여 페이지를 pre-render한다.
  - 이때 함수는 페이지 요청마다 실행되고 함수가 반환하는 데이터는 페이지 컴포넌트의 props로 전달된다.
  - 서버 측에서만 실행되며 브라우저에서는 실행되지 않는다.
3. getStaticProps
  - getStaticProps는 최초 빌드 시에 단 한 번만 호출이 됩니다. 최초 빌드 시 빌드되는 값이 추후에 수정될 일이 없다면 사용하기 좋습니다.
  - 주기적으로 재 설정이 필요하다면 revalidate: Number 를 사용해서 가능합니다.
4. getStaticPaths
  - 동적 경로를 사용하는 페이지에서 getStaticPaths라는 함수를 사용할 때 NextJS는 getStaticPaths에 지정된 모든 경로를 정적으로 미리 렌더링한다.
  - paths값은 pre-rendering할 경로를 설정해야합니다. /categories/[category] 이런식으로 설정을 해아합니다.
  - fallback은 true, false, blocking 세 가지가 존재하는데 우선 true와 false만 공부를 했기에.. 두 가지만 해보겠습니다.
    - true: 만약에 빌드 타임에 pre-rendering된 정적 페이지 외의 페이지에 들어갈 때 해당 페이지를 탐색을 하고 새롭게 빌드가 됩니다.
    - false: 빌드 타임에 pre-rendering 된 페이지만 표시하고 그외의 페이지는 404 error가 발생합니다. 주로 적은 페이지, 새롭게 페이지를 추가하지 않을 때 유용하게 사용합니다.

## 느낀점
- SSR, SSG에 대해 학습을 했고 각각에 사용되는 함수를 직접 실습을 해봤습니다. SSR과 CSR의 차이점은 서버에서 미리 렌더링된 DOM구조를 HTML문서를 렌더링하여 웹 크롤링, SEO에 좋습니다.
- 구조적으로 만들기 좋았습니다. 컴포넌츠를 구성할 때 큰 고민없이 규격대로 설계해서 좋습니다.
