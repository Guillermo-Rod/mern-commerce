import mongoose from "mongoose";
import Permission from "../app/models/Permission.mjs";
import Role from "../app/models/Role.mjs";
import { connectToDB } from "../app/config/database.mjs";


/**
 * Command config and defaults
 */
export const config = {
    name: 'Insert Roles and Permissions',
    syntax: 'db:seed-permissions',
    description: 'insert roles and permissions to db',
    options: {}
};

/**
 * Execute command
 * @param {randomBytes, stringFormat} arguments
 * @returns String
 */
export const handle = async () => {

    await connectToDB();
    console.log('Creating permissions...');
    
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        const permissions = await Permission.insertMany([
            // Access domain
            {name: 'access_admin_domain'},
            {name: 'access_user_domain'},
            {name: 'access_delivery_driver_domain'},
    
            // Users
            {name: 'view_users'},
            {name: 'create_users'},
            {name: 'update_users'},
            {name: 'delete_users'},

            // Orders
            {name: 'view_orders'},
            {name: 'create_orders'},
            {name: 'update_orders'},
            {name: 'delete_orders'},
    
            // Products
            {name: 'view_products'},
            {name: 'create_products'},
            {name: 'update_products'},
            {name: 'delete_products'},
        ]);
    
        const roles = await Role.insertMany([
            {name: 'User'},
            {name: 'Delivery Driver'},
            {name: 'Admin'},
        ]);

        await addPermissionToRoles(roles, permissions);

        await session.commitTransaction();
        console.log('Permissions were created!');
    } catch (error) {
        await session.abortTransaction();
        console.error('Permissions were not created!:', error.message);
    } finally {
        session.endSession();
        mongoose.disconnect();
    }
}

async function addPermissionToRoles(roles, permissions) {
    // User
    await Role.updateOne(
        { _id: roles.find(r => r.name === 'User')._id },
        { $addToSet: { 
            permissions: [
                permissions.find(p => p.name === 'access_user_domain')._id
            ],
        } }
    );
  
    // Delivery
    await Role.updateOne(
        { _id: roles.find(r => r.name === 'Delivery Driver')._id },
        { $addToSet: { 
            permissions : [
                permissions.find(p => p.name === 'access_delivery_driver_domain')._id,
                //
                permissions.find(p => p.name === 'view_orders')._id,
                permissions.find(p => p.name === 'update_orders')._id,
            ]
        } }
    );

    // Admin
    await Role.updateOne(
        { _id: roles.find(r => r.name === 'Admin')._id },
        { $addToSet: {
            permissions : [
                permissions.find(p => p.name === 'access_admin_domain')._id,
                //
                permissions.find(p => p.name === 'view_users')._id,
                permissions.find(p => p.name === 'create_users')._id,
                permissions.find(p => p.name === 'update_users')._id,
                permissions.find(p => p.name === 'delete_users')._id,
                //
                permissions.find(p => p.name === 'view_products')._id,
                permissions.find(p => p.name === 'create_products')._id,
                permissions.find(p => p.name === 'update_products')._id,
                permissions.find(p => p.name === 'delete_products')._id,
                //
                permissions.find(p => p.name === 'view_orders')._id,
                permissions.find(p => p.name === 'create_orders')._id,
                permissions.find(p => p.name === 'update_orders')._id,
                permissions.find(p => p.name === 'delete_orders')._id,
            ] 
        } }
    );
}
