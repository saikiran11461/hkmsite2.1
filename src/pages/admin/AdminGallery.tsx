import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, X, Upload, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import galleryDarshan from "@/assets/gallery-darshan-1.jpg";
import galleryFestival from "@/assets/gallery-festival-1.jpg";
import galleryAarti from "@/assets/gallery-aarti.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import galleryAnnadaan from "@/assets/gallery-annadaan-1.jpg";

const initialImages = [
  { id: 1, src: galleryDarshan, title: "Morning Darshan", category: "Daily Darshan", date: "2026-03-05" },
  { id: 2, src: galleryFestival, title: "Gaura Purnima Celebration", category: "Festivals", date: "2026-03-04" },
  { id: 3, src: galleryAarti, title: "Evening Aarti", category: "Daily Darshan", date: "2026-03-04" },
  { id: 4, src: galleryClass, title: "Bhagavad Gita Class", category: "Community", date: "2026-03-03" },
  { id: 5, src: galleryAnnadaan, title: "Anna Daan Distribution", category: "Seva", date: "2026-03-02" },
];

const categories = ["All", "Daily Darshan", "Festivals", "Seva", "Community"];

const AdminGallery = () => {
  const [images, setImages] = useState(initialImages);
  const [filter, setFilter] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState({ title: "", category: "Daily Darshan", date: "" });

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  const handleDelete = (id: number) => setImages(images.filter((img) => img.id !== id));

  const handleUpload = () => {
    if (!uploadForm.title) return;
    setImages([
      ...images,
      {
        id: Date.now(),
        src: galleryDarshan, // placeholder
        title: uploadForm.title,
        category: uploadForm.category,
        date: uploadForm.date || new Date().toISOString().split("T")[0],
      },
    ]);
    setShowUpload(false);
    setUploadForm({ title: "", category: "Daily Darshan", date: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage temple photos and images</p>
        </div>
        <Button onClick={() => setShowUpload(true)}><Plus className="w-4 h-4 mr-2" /> Upload Images</Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-background rounded-2xl p-6 w-full max-w-md shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold">Upload Image</h2>
                <button onClick={() => setShowUpload(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click or drag to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>
                <Input placeholder="Image Title" value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} />
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <Input type="date" value={uploadForm.date} onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })} />
                <Button onClick={handleUpload} className="w-full">Upload</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <img src={preview} alt="Preview" className="max-w-full max-h-[80vh] rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <Card key={img.id} className="overflow-hidden group">
            <div className="relative aspect-square">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Button size="icon" variant="secondary" onClick={() => setPreview(img.src)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(img.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{img.title}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="outline" className="text-xs">{img.category}</Badge>
                <span className="text-xs text-muted-foreground">{img.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
