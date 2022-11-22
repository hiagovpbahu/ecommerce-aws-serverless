#!/usr/bin/env node
import 'source-map-support/register'
import { App, Environment } from 'aws-cdk-lib'
import { ProductsAppStack } from '../lib/products-app-stack'
import { EcommerceApiStack } from '../lib/ecommerce-api-stack'
import { ProductsAppLayerStack } from '../lib/products-app-layer'

const app = new App()

const env: Environment = {
  account: '977919880276',
  region: 'sa-east-1',
}

const tags = {
  cost: 'ECommerce',
  team: 'HiagobahuDev',
}

const productsAppLayerStack = new ProductsAppLayerStack(app, 'ProductsAppLayers', {
  tags,
  env,
})

const productsAppStack = new ProductsAppStack(app, 'ProductsApp', {
  tags,
  env,
})
productsAppStack.addDependency(productsAppLayerStack)

const eCommerceApiStack = new EcommerceApiStack(app, 'ECommerceApi', {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags,
  env,
})
eCommerceApiStack.addDependency(productsAppStack)
