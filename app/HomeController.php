<?php

namespace App;

use NeoIsRecursive\Inertia\Http\InertiaResponse;
use Tempest\Router\Get;

use function NeoIsRecursive\Inertia\inertia;

final readonly class HomeController
{
    #[Get('/')]
    public function __invoke(): InertiaResponse
    {
        return inertia("Home", []);
    }
}
