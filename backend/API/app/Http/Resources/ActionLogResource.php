<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'user'      => $this->user?->name,
            'device'    => $this->device?->name,
            'action'       => $this->action,
            'performed_at' => $this->performed_at
                    ? \Carbon\Carbon::parse($this->performed_at)->format('d.m.Y')
                    : null,
            // promenili smo format i izbacili datume kada su kreirani i apdejtovani podaci da se ne bi zbunili
        ];
    }
}
