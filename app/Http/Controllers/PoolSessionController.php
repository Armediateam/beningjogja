<?php

namespace App\Http\Controllers;

use App\Models\PoolSession;
use Illuminate\Http\Request;

class PoolSessionController extends Controller
{
    public function update(Request $request, PoolSession $poolSession)
    {
        $validated = $request->validate([
            'price' => 'required|integer|min:0',
        ]);

        $poolSession->update($validated);

        return redirect()->back()->with('success', 'Harga sesi kolam renang berhasil diperbarui.');
    }
}
