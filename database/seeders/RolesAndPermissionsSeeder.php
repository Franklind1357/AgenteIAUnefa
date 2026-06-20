<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' =>'gestion administrativa']);
        Permission::create(['name'=>'gestion dispositivos']);

        $roleDispositivo = Role::create(['name' => 'dispositivo']);
        $roleDispositivo->givePermissionTo([
            'gestion dispositivos'
        ]);

        $roleAdmin = Role::create(['name' =>'admin_unefa']);
        $roleAdmin->givePermissionTo(['gestion administrativa']);

        //eliminar en produccion
        $userAdmin = User::firstOrCreate(
            ['email' => 'admin@unefa.com'],
            [
                'name' => 'Administrador UNEFA',
                'password' => Hash::make('1234'),
            ]
        );

        $userAdmin->assignRole('admin_unefa');
    }
}
