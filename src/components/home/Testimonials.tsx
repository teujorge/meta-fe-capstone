import { Star } from "lucide-react";
import { cn } from "src/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function Testimonials() {
  return (
    <div className="flex flex-col limit-width p-4 gap-8">
      <h2>Testimonials</h2>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <TestimonialCard
          img="https://randomuser.me/api/portraits/men/75.jpg"
          name="John Doe"
          rating={5}
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec ligula nec nunc fringilla ultricies."
        />

        <TestimonialCard
          img="https://randomuser.me/api/portraits/women/75.jpg"
          name="Jane Doe"
          rating={4}
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec ligula nec nunc fringilla ultricies."
        />

        <TestimonialCard
          img="https://randomuser.me/api/portraits/men/75.jpg"
          name="John Smith"
          rating={5}
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec ligula nec nunc fringilla ultricies."
        />

        <TestimonialCard
          img="https://randomuser.me/api/portraits/women/75.jpg"
          name="Jane Smith"
          rating={4}
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec ligula nec nunc fringilla ultricies."
        />
      </div>
    </div>
  );
}

function TestimonialCard({
  img,
  name,
  rating,
  review,
}: {
  img: string;
  name: string;
  rating: number;
  review: string;
}) {
  return (
    <Card className="w-full sm:w-48">
      <CardHeader>
        <CardTitle className="flex flex-col items-center justify-center">
          {name}
          <div className="w-full flex flex-row p-2 items-center justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "text-yellow-500 w-4 h-4",
                  i < rating && "fill-yellow-500"
                )}
              />
            ))}
          </div>
        </CardTitle>
        <img
          src={img}
          alt={`${name} testimonial`}
          className="w-full h-20 object-cover rounded-md"
        />
      </CardHeader>

      <CardContent>
        <CardDescription>{review}</CardDescription>
      </CardContent>
    </Card>
  );
}
