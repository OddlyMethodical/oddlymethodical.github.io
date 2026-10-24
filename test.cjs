const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
test('all four public repositories and sites are present',()=>{
for(const repo of ['a-sea-of-sand','eclipse-lab','graft-support','ninety-night-support']) assert.ok(html.includes('https://github.com/OddlyMethodical/'+repo));
for(const url of ['https://oddlymethodical.github.io/a-sea-of-sand/','https://oddlymethodical.github.io/eclipse-lab/','https://hardgraft.app/','https://ninetynight.app/']) assert.ok(html.includes(url));
});
test('local assets and anchor destinations exist',()=>{
for(const [,href] of html.matchAll(/href="([^"]+)"/g)) {
if(href.startsWith('#')&&href.length>1) assert.ok(html.includes('id="'+href.slice(1)+'"'));
else if(!/^(https:|data:|#)/.test(href)) assert.ok(fs.existsSync(__dirname+'/'+href));
}
assert.ok(!/mailto:|gmail|patrick|<script|<iframe/i.test(html));
});
