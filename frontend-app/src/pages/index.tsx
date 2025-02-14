import PdfUploader from "@/components/PdfUploader";
import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-bold">PDF to Text Extr8r </h1>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/cozyCodr"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Bright Londa</p>
        </Link>
      </div>
      <PdfUploader />
    </DefaultLayout>
  );
}
