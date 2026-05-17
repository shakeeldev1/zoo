import React from 'react';
import BuyAnimal from '../components/animal/BuyAnimal';

const BuyAnimalPage = () => {
  return (
    <main className="min-h-screen bg-slate-100 pt-28">
      <section className="bg-gradient-to-r from-emerald-900 to-slate-800 py-20 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-emerald-200">Animal Market</p>
          <h1 className="text-5xl font-extrabold sm:text-6xl">Buy your favorite animal with confidence.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200/90">
            Browse premium animals, compare prices, and add selections to your cart with a polished, responsive interface.
          </p>
        </div>
      </section>

      <BuyAnimal />
    </main>
  );
};

export default BuyAnimalPage;
