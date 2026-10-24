const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
test('selected public source links and all four demos are present',()=>{
for(const repo of ['a-sea-of-sand','eclipse-lab']) assert.ok(html.includes('https://github.com/OddlyMethodical/'+repo));
for(const url of ['https://oddlymethodical.github.io/a-sea-of-sand/','https://oddlymethodical.github.io/eclipse-lab/','https://oddlymethodical.github.io/lily-pad/','https://oddlymethodical.github.io/fourier-playground/']) assert.ok(html.includes(url));
});
test('local assets and anchor destinations exist',()=>{
for(const [,href] of html.matchAll(/href="([^"]+)"/g)) {
if(href.startsWith('#')&&href.length>1) assert.ok(html.includes('id="'+href.slice(1)+'"'));
else if(!/^(https:|data:|#)/.test(href)) assert.ok(fs.existsSync(__dirname+'/'+href));
}
assert.ok(!/mailto:|gmail|<script|<iframe/i.test(html));
});

test('removed apps and private source links stay off the page',()=>{
assert.ok(html.includes('Hi, I’m<br><em>Patrick.'));
assert.ok(!/graft|ninety|https:\/\/github.com\/OddlyMethodical\/(lily-pad|fourier-playground)/i.test(html));
});
