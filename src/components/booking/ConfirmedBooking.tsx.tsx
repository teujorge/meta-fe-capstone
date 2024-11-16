import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import { Button } from "../ui/button";

export function ConfirmedBookingPage() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} />
      <main className="limit-width flex flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="pt-12">Booking Confirmed!</h1>
          <p className="text-xl">
            Thank you for choosing Little Lemon. Your table has been reserved.
          </p>
          <p className="text-muted-foreground">
            A confirmation email will be sent to you shortly with your booking
            details.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            We look forward to serving you at Little Lemon Chicago.
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Return Home
          </Button>
        </div>
      </main>
    </>
  );
}
