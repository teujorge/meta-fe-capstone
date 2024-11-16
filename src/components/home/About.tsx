export function About() {
  return (
    <div className="limit-width flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2">
        <h2>Little Lemon</h2>
        <h4 className="pt-4 pb-8">Chicago</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          fringilla, metus in lacin ia facilisis, nunc nisl ultricies nunc, nec
          gravida magna mi in odio. Nullam fringilla, metus in lacin ia
          facilisis, nunc nisl ultricies nunc, nec gravida magna mi in odio.
        </p>
      </div>

      <div className="relative w-full md:w-1/2 p-8">
        <img
          src="/assets/about/chris-james-tanner-2.jpg"
          alt="owner 1"
          className="m-2 object-cover w-full md:w-1/2 h-72 md:absolute top-0 right-4 rounded-lg shadow-lg bg-accent border"
          aria-label="Owner 1"
        />

        <img
          src="/assets/about/chris-james-tanner-1.jpg"
          alt="owner 2"
          className="m-2 object-cover w-full md:w-1/2 h-72 md:absolute bottom-0 left-4 rounded-lg shadow-lg bg-accent border"
          aria-label="Owner 2"
        />
      </div>
    </div>
  );
}
