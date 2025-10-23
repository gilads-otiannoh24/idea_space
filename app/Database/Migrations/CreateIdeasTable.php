<?php

declare(strict_types=1);

namespace App\Database\Migrations;

use Tempest\Database\MigratesDown;
use Tempest\Database\MigratesUp;
use Tempest\Database\QueryStatement;
use Tempest\Database\QueryStatements\CreateTableStatement;
use Tempest\Database\QueryStatements\DropTableStatement;

final class CreateIdeasTable implements MigratesUp, MigratesDown
{
    public string $name = "2025_10_24_create_ideas_table";
    public function up(): QueryStatement
    {
        return new CreateTableStatement("ideas")->primary()
            ->string('title')
            ->string('slug')->unique()
            ->text('description')
            ->string('status', 255, false, "draft")
            ->json('tags', true)
            ->datetime("createdAt");
    }

    public function down(): QueryStatement
    {
        return new DropTableStatement("ideas");
    }
}
