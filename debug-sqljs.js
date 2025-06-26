#!/usr/bin/env node

/**
 * SQL.js Loading Diagnostic Script
 * Run this script to diagnose SQL.js loading issues in your environment
 */

import { createRequire } from 'module';
import https from 'https';
import fs from 'fs/promises';
import path from 'path';

const require = createRequire(import.meta.url);

console.log('🔍 SQL.js Loading Diagnostic Script');
console.log('=====================================\n');

// Test 1: Check if sql.js is installed
console.log('Test 1: Checking npm package installation...');
try {
  const sqljs = require('sql.js');
  console.log('✅ sql.js npm package found');
  console.log(`   Version: ${require('sql.js/package.json').version}`);
} catch (error) {
  console.log('❌ sql.js npm package not found');
  console.log('   Run: npm install sql.js');
}

// Test 2: Check WASM files in node_modules
console.log('\nTest 2: Checking WASM files in node_modules...');
try {
  const sqlJsPath = path.dirname(require.resolve('sql.js'));
  const distPath = path.join(sqlJsPath, 'dist');
  const files = await fs.readdir(distPath);
  
  const wasmFiles = files.filter(f => f.endsWith('.wasm'));
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  console.log(`✅ Found ${wasmFiles.length} WASM files:`, wasmFiles);
  console.log(`✅ Found ${jsFiles.length} JS files:`, jsFiles);
  
  // Check file sizes
  for (const file of wasmFiles) {
    const filePath = path.join(distPath, file);
    const stats = await fs.stat(filePath);
    console.log(`   ${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  }
} catch (error) {
  console.log('❌ Error checking WASM files:', error.message);
}

// Test 3: Check CDN accessibility
console.log('\nTest 3: Checking CDN accessibility...');
const cdnUrls = [
  'https://sql.js.org/dist/sql-wasm.js',
  'https://sql.js.org/dist/sql-wasm.wasm',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/sql-wasm.js',
  'https://unpkg.com/sql.js@1.13.0/dist/sql-wasm.js'
];

for (const url of cdnUrls) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      console.log(`✅ ${url} - Status: ${response.status}`);
    } else {
      console.log(`❌ ${url} - Status: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ ${url} - Error: ${error.message}`);
  }
}

// Test 4: Check Docker/Container environment
console.log('\nTest 4: Checking environment...');
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

// Check if running in container
const isDocker = await fs.access('/.dockerenv').then(() => true).catch(() => false);
console.log(`Running in Docker: ${isDocker ? 'Yes' : 'No'}`);

// Check environment variables
const relevantEnvVars = ['NODE_ENV', 'VITE_*', 'PORT', 'HOST'];
console.log('\nEnvironment variables:');
for (const key of Object.keys(process.env)) {
  if (relevantEnvVars.some(pattern => key.match(pattern.replace('*', '.*')))) {
    console.log(`  ${key}=${process.env[key]}`);
  }
}

// Test 5: Memory and resource checks
console.log('\nTest 5: Resource availability...');
const memUsage = process.memoryUsage();
console.log(`Memory usage: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB used / ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB total`);

// Test 6: WASM support
console.log('\nTest 6: WebAssembly support...');
try {
  if (typeof WebAssembly !== 'undefined') {
    console.log('✅ WebAssembly is supported');
    
    // Test basic WASM instantiation
    const wasmCode = new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00
    ]);
    await WebAssembly.instantiate(wasmCode);
    console.log('✅ WASM instantiation test passed');
  } else {
    console.log('❌ WebAssembly not supported');
  }
} catch (error) {
  console.log('❌ WASM test failed:', error.message);
}

console.log('\n📋 Diagnosis complete!');
console.log('\nRecommendations:');
console.log('1. If CDN access fails, use local WASM files');
console.log('2. If in Docker, ensure network policies allow external requests');
console.log('3. Consider using sql.js npm package instead of CDN');
console.log('4. Check browser console for additional error details');