---
layout: bare
title: "atlases and you!"
desc: "a tiny rant about how i'm bad at programming"
---

# atlases and you! (i hate defining formats)

### Friday, 7/17/2026, 9:47PM

there comes a point in your life where you, while making your game engine, tool, or third option, have to create your own file format. you might foolishly assume it's easy and cool as fuck, like i did. you're only defining how data is stored and what said data means, right? it's not that hard, right? RIGHT??

well as it turns out, i was deathly wrong. do you ever just sudden epiphanies in the form of "i hate JSON and i hate parsing it more?"

creating a texture atlasing system for my game engine is a task i have been avoiding for quite a while now. let it be known i absolutely dread creating (binary) parsers of any kind, due to the sheer amount of boilerplate code i have to write to do something as mundane as, get this, reading like 8 bytes of data stored as 16-bit integers. there's only so many times you can type "reader.ReadInt16();" before going insane. in this case, it's four. but when writing a custom ZIP extractor (not that this is a common thing to do, but humor me and imagine you're building a modding tool for a fucked up format) where you have to keep track of way too many variables, this can scale up to way more than just four!

so naturally, i turned to something more simplistic to define my format: JSON. you've probably heard of it already, it's designed to efficiently transport requests to and from servers. people also use it for configs and other data storage for some reason. it can't POSSIBLY be that hard to parse. guess fucking what, yes it was.

take this example JSON file i wrote:

![json atlas](/images/blog/json_atlas.png)

this is supposed to define two dummy frames in a sprite sheet (that obviously doesn't exist rn) and place them in the atlas. again, easy on paper, hell in practice.

due to my terminal stupidity, i decided to write my game engine using the .NET Framework (not .NET Core!) which, even in its latest iteration does not natively support JSON and instead requires an external library to handle it, Newtonsoft.Json. granted, this is entirely my fault and was entirely avoidable, had i know that FNA actually does support .NET Core, but i digress. the real issue stems from the fact that Newtonsoft.Json was pretty obviously written like 15 years ago.

this library is **extremely obtuse.** the documentation is also kinda shit, too. deserializing directly into a C# class using "JsonConvert.Deserialize()" works fine, provided your JSON maps directly to the class you're deserializing to. trying to get a specific key's value from the JSON, however, is not! first, you have to create a new 'JObject' (super informative name, this very clearly explains whatever the fuck this type is supposed to be), use the awesome syntax of "string thing = (string)json["thing"];" and pray to the .NET runtime gods that it works. at this point, my time would be better spent just writing my own parser, but i'm both too lazy and bad at C# to do any such thing.

at this current moment, i literally don't know what to do and am at a loss. i tried using XML, got confused and left it there. but i guess with enough head banging against wall i'll get it to work :D (this is a joke!!!!)

\- memoryleak
