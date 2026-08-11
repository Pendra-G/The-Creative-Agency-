import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui.jsx";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found — Website Portfolio";
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center bg-canvas pb-section pt-32">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <h1 className="display text-display-xl text-white">
          That page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-measure text-body-lg text-body">
          Which is fitting, given the whole point is keeping sites small.
        </p>
        <div className="mt-9">
          <Button as={Link} to="/" variant="primary" size="lg">
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
