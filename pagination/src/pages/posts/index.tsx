// import { GetStaticPaths, GetStaticProps} from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: number;
  image: string;
  lastName: string;
  email: string;
  firstName: string;
}

interface Props {
  posts: Post[];
  page: number;
  totalPages: number;
}

export default function PostsPage({ posts, page, totalPages }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Paginated Posts (SSR)</h1>
      <ul className="space-y-2 mb-6">
        {posts.map((post) => (
          (<li
            key={post.id}
            className="border p-3 rounded shadow-sm flex items-center gap-4"
          >
            <Image
              src={post.image}
              width={50}
              height={50}
              alt={post.firstName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">
                {post.firstName} {post.lastName}
              </p>
              <p className="text-sm text-gray-500">{post.email}</p>
            </div>
          </li>)
        ))}
      </ul>
      <div className="flex space-x-2">
        <div style={{ marginTop: "2rem" }}>
          {page > 1 && (
            <Link href={`/posts?page=${page - 1}`}>
              <button style={{ marginRight: "1rem" }}>Previous</button>
            </Link>
          )}

          <span>
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link href={`/posts?page=${page + 1}`}>
              <button style={{ marginLeft: "1rem" }}>Next</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context, "CONTEXT");
  const page = parseInt((context.query.page as string) || "1", 10);
  const limit = 5;
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  const data = await res.json();

  return {
    props: {
      posts: data.users,
      page: page,
      totalPages: Math.ceil((data.total / 2 - 4) / limit),
    },
  };
};
