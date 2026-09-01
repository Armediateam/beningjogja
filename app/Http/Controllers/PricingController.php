<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pricing;

class PricingController extends Controller
{
    public function index()
    {
        return inertia('dashboard/pricing', [
            'pricings' => Pricing::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'status' => 'required|in:Active,Inactive',
            'description' => 'nullable|string',
            'facilities' => 'nullable|array',
            'image' => 'nullable|image|max:2048'
        ]);

        $code = \Illuminate\Support\Str::slug($validated['name']);
        
        // Ensure uniqueness
        $originalCode = $code;
        $counter = 1;
        while(Pricing::where('code', $code)->exists()) {
            $code = $originalCode . '-' . $counter;
            $counter++;
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pricings', 'public');
        }

        Pricing::create([
            'name' => $validated['name'],
            'code' => $code,
            'type' => $validated['type'],
            'price' => $validated['price'],
            'status' => $validated['status'],
            'description' => $validated['description'] ?? null,
            'facilities' => $validated['facilities'] ?? [],
            'image' => $imagePath
        ]);
        return redirect()->back()->with('success', 'Harga berhasil ditambahkan.');
    }

    public function update(Request $request, Pricing $pricing)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'status' => 'required|in:Active,Inactive',
            'description' => 'nullable|string',
            'facilities' => 'nullable|array',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($pricing->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($pricing->image);
            }
            $validated['image'] = $request->file('image')->store('pricings', 'public');
        }

        $pricing->update($validated);
        return redirect()->back()->with('success', 'Harga berhasil diperbarui.');
    }

    public function destroy(Pricing $pricing)
    {
        $pricing->delete();
        return redirect()->back()->with('success', 'Harga berhasil dihapus.');
    }
}
