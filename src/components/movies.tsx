"use client";

import { Film, Star } from "lucide-react";
import { Marquee } from "@/registry/magicui/marquee";
import { movies } from "@/data/movies";

export function Movies() {
  return (
    <section id="movies" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow-sm border border-red-200">
               <Film className="w-6 h-6 text-red-600" />
           </div>
           <h2 className="text-4xl font-bold text-gray-800">Movies</h2>
        </div>
      </div>

      <div className="relative w-full">
        {/* Film Strip Effect Top - Adapted for light theme */}
        <div className="w-full h-8 bg-repeat-x flex gap-2 mb-4 opacity-10" 
             style={{ backgroundImage: "linear-gradient(to right, #000 50%, transparent 50%)", backgroundSize: "40px 100%" }} 
        />

        <Marquee className="[--duration:40s]" pauseOnHover>
            {movies.map((movie, i) => (
                <div key={i} className={`w-64 h-96 ${movie.color} rounded-xl mx-4 flex flex-col justify-end p-6 relative group cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    {/* Placeholder Poster */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2 text-white">
                        <h3 className="text-2xl font-bold mb-1 leading-tight drop-shadow-md">{movie.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-200">
                            <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{movie.year}</span>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="font-bold">{movie.rating}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
            ))}
        </Marquee>

        {/* Film Strip Effect Bottom - Adapted for light theme */}
        <div className="w-full h-8 bg-repeat-x flex gap-2 mt-4 opacity-10" 
             style={{ backgroundImage: "linear-gradient(to right, #000 50%, transparent 50%)", backgroundSize: "40px 100%" }} 
        />
      </div>
    </section>
  );
}
