import { Link } from "react-router-dom";
import Container from "../../../Components/Ui/Container/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const Articles = () => {
  const axiosPublic = useAxiosPublic()
  const {data:articles=[]}=useQuery({
    queryKey:['articles'],
    queryFn: async()=>{
      const {data} = await axiosPublic("/articles")
      return data;
    }
  })
  return (
    <Container>
      <div className="my-24">
        <div className="flex flex-col items-center md:flex-row justify-between ">
          <h2 className="text-3xl font-bold">Avansi&apos;s Article</h2>
          <Link to="/">
            <button className="btn btn-outline btn-xs md:border-primary md:btn-md px-8 hover:btn-primary">
              View All
            </button>
          </Link>
        </div>
        <div className="py-8 grid justify-center gap-4 md:grid-cols-4">
          {articles.map((article) => {
            return (
              <div key={article.title} className="card w-64 glass">
                <figure className="h-[200px]">
                  <img
                    src={article?.image}
                    alt={article?.title}
                    className="object-contain w-full"
                  />
                </figure>
                <div className="card-body p-2">
                  <h2 className="card-title">{article?.title.slice(0,40)+'....'}</h2>
                  <p>{article.date}</p>
                  <p>{article.details.slice(0,100)+'...'}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-primary md:btn-md">Learn now!</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Articles;
