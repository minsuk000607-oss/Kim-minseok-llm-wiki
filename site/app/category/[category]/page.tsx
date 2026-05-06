export default function CategoryPage({ params }: { params: { category: string } }) {
  return <main>카테고리: {params.category}</main>;
}
