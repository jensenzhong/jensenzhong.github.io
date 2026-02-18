"use client";

import { BookOpen, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { books, currentlyReading, booksReadThisYear } from "@/data/books";

export function Reading() {
  return (
    <section id="books" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
               <BookOpen className="w-6 h-6 text-amber-600" />
           </div>
           <h2 className="text-4xl font-bold text-gray-800">Reading</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Book (Left - 5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[400px]">
                <div>
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2 block">Currently Reading</span>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentlyReading.title}</h3>
                    <p className="text-gray-500 mb-6">{currentlyReading.author}</p>

                    <div className="space-y-2 mb-8">
                        <div className="flex justify-between text-xs font-medium text-gray-500">
                            <span>Progress</span>
                            <span>{currentlyReading.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${currentlyReading.progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-amber-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl relative">
                    <Quote className="w-8 h-8 text-amber-200 absolute -top-4 -left-2 fill-current" />
                    <p className="text-gray-700 italic relative z-10 text-sm leading-relaxed">
                        &quot;{currentlyReading.quote}&quot;
                    </p>
                </div>
            </div>

            {/* Bookshelf (Right - 7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {books.map((book, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-16 ${book.cover} rounded shadow-sm border border-gray-200`} />
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < book.rating ? "text-amber-400 fill-current" : "text-gray-200"}`} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">{book.title}</h4>
                            <p className="text-xs text-gray-500 mb-3">{book.author}</p>
                            <p className="text-xs text-gray-400 line-clamp-2 border-t border-gray-50 pt-3">
                                {book.quote}
                            </p>
                        </div>
                    </motion.div>
                ))}
                
                {/* Stat Card */}
                <div className="bg-gray-800 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                    <div className="text-5xl font-bold mb-2 text-amber-400">{booksReadThisYear}</div>
                    <div className="text-sm text-gray-300">Books read in 2025</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
