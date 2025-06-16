import Image from "next/image";

const Testimony = () => {
  return (
    <section className="max-container padding-container py-10 px-10 my-10  bg-pattern-2 bg-center bg-cover bg-blend-multiply bg-red-900 bg-opacity-70">
      <h1 className="bold-45 lg:bold-62 text-white text-center my-6 ">
        Doctors Testimonials
      </h1>
      <div className="flex flex-col lg:flex-row flexBetween my-4 gap-8">
        <div className="block px-24 py-12  text-left bg-white rounded-xl">
          <div className=" flex flex-col gap-6 lg:flex-row flexCenter mb-12">
            <Image
              className="inline-block h-16 w-16 rounded-full border-2 border-green-700"
              src="/p2.jpg"
              alt="person"
              width={200}
              height={200}
            />
            <div className="text-left mx-3">
              <h4 className="bold-16 lg:bold-18 text-black">
                Dr. George Mitchell
              </h4>
              <p className="regular-14 lg:regular-14 text black">Customer</p>
            </div>
          </div>

          <p className="regular-14 mt-6 text-black xl:max-w-[300px]">
            {" "}
            i bought a used laptop from evergrow gadgets despite feeling
            skeptical about it but i went ahead because i was low on funds and
            the system has not given me an issue since then.
          </p>
        </div>

        <div className="block px-24 py-12  text-left bg-white rounded-xl">
          <div className=" flex flex-col gap-6 lg:flex-row flexCenter mb-12">
            <Image
              className="inline-block h-16 w-16 rounded-full border-2 border-green-700"
              src="/p1.jpg"
              alt="person"
              width={200}
              height={200}
            />
            <div className="text-left mx-3">
              <h4 className="bold-16 lg:bold-18 text-black">Dr Hannah Grey</h4>
              <p className="regular-14 lg:regular-14 text black">Customer</p>
            </div>
          </div>
          <p className="regular-14 mt-6 text-black xl:max-w-[300px]">
            i sent my laptop to repaired in by evergrow and i love the way they
            handle the system diligently without creating more problems for me.{" "}
          </p>{" "}
        </div>
      </div>
    </section>
  );
};

export default Testimony;
