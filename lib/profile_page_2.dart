import 'dart:ui';

import 'package:flutter/material.dart';
import 'home_page.dart';

class ProfilePage2 extends StatefulWidget {
  const ProfilePage2({Key? key}) : super(key: key);

  @override
  State<ProfilePage2> createState() => _ProfilePage2State();
}

class _tweet extends StatefulWidget {
  final Widget? embedded;
  final bool reTweet;
  const _tweet({Key? key, this.embedded, this.reTweet = false})
      : super(key: key);

  @override
  State<_tweet> createState() => _tweetState();
}

class _tweetState extends State<_tweet> {
  bool liked = false;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(children: <Widget>[
          CircleAvatar(
            backgroundImage: const AssetImage('assets/user_2.png'),
          ),
          TextButton(
              onPressed: null, //Action to be added later
              child: Row(children: [
                Text('Username',
                    style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 18))
              ])),
          Text('@user_handle',
              style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: Color(0xff9e9e9e))),
          Text(
            ' 23m',
            style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 8,
                color: Color(0xff9e9e9e)),
          ),
          if (widget.reTweet == true) ...[
            SizedBox(
              width: 20,
            ),
            Icon(
              Icons.loop,
              color: Colors.grey[800],
              size: 20,
            ),
            Text(
              ' Retweeted',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 10,
                  color: Color(0xff9e9e9e)),
            )
          ],
        ]),
        Text(
            'Tweet Content: this is only an example of the tweet text and will be updated later.'),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            ElevatedButton(
              onPressed: () {
                /* MaterialPageRoute(builder: (context) => HomePage()); */
              },
              style: ElevatedButton.styleFrom(
                shape: CircleBorder(),
                primary: Colors.white,
                fixedSize: Size(15, 15),
              ),
              child: Icon(
                Icons.comment,
                color: Colors.black,
                size: 20,
              ),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  liked = !liked;
                });
              },
              style: ElevatedButton.styleFrom(
                shape: CircleBorder(),
                primary: Colors.white,
                fixedSize: Size(15, 15),
              ),
              child: Stack(
                children: [
                  Icon(
                    Icons.thumb_up,
                    color: liked ? Colors.green : Colors.white,
                    size: 20,
                  ),
                  Icon(
                    Icons.thumb_up_outlined,
                    size: 20,
                    color: Colors.black,
                  ),
                ],
              ),
            ),
          ],
        ),
        SizedBox(
          height: 15,
        ),
        if (widget.embedded == null) ...[
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 75),
            child: Divider(
              color: Color(0xff6d71ff),
            ),
          )
        ] else ...[
          Container(
            padding: EdgeInsets.all(8),
            margin: EdgeInsets.all(8),
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(Radius.circular(8)),
            ),
            child: widget.embedded,
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 75),
            child: Divider(
              color: Color(0xff6d71ff),
            ),
          ),
        ],
      ],
    );
  }
}

class _ProfilePage2State extends State<ProfilePage2> {
  bool followed = false;
  bool reported = false;
  DateTime BanDuration = DateTime.now();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xffffffff),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/Logo_no_bg.png',
              height: 100,
            ),
          ],
        ),
      ),
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: false,
            pinned: false,
            snap: false,
            automaticallyImplyLeading: false,
            backgroundColor: Colors.white,
            toolbarHeight: 200,
            expandedHeight: 200,
            flexibleSpace: FlexibleSpaceBar(
              background: Image(
                image: NetworkImage(
                    'https://external-preview.redd.it/De0R4qxOUfCxMoXAP_9SBt0poFN7EtzaDfQGUHxlzfE.png?auto=webp&s=e380bbcacb6e2081a9f773ec84c0e46fc285e1ae'),
                fit: BoxFit.fitWidth,
                width: double.infinity,
                height: 200,
              ),
            ),
          ),
          SliverAppBar(
            floating: false,
            pinned: true,
            snap: false,
            automaticallyImplyLeading: false,
            backgroundColor: Colors.white,
            toolbarHeight: 100,
            title: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    CircleAvatar(
                      backgroundImage: const AssetImage('assets/user_2.png'),
                    ),
                    Column(
                      children: [
                        Text('Username',
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 18)),
                        Text('@user_handle',
                            style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Color(0xff9e9e9e))),
                      ],
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          followed = !followed;
                        });
                      },
                      style: ElevatedButton.styleFrom(
                        shape: CircleBorder(),
                        primary: followed ? Colors.red : Colors.green,
                        fixedSize: Size(20, 20),
                      ),
                      child: Icon(
                        followed
                            ? Icons.group_remove_outlined
                            : Icons.group_add_outlined,
                        color: Colors.white,
                        size: 20.0,
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        if (!reported) {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text('Report?'),
                              content: Text(
                                  'Are you sure you want to report this user?'),
                              actions: <Widget>[
                                TextButton(
                                  child: Text('Yes'),
                                  onPressed: () {
                                    setState(() {
                                      reported = true;
                                      Navigator.pop(context);
                                    });
                                  },
                                ),
                                TextButton(
                                  child: Text('No'),
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                ),
                              ],
                            ),
                          );
                        } else {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text('Report?'),
                              content:
                                  Text('You have already reported this user'),
                              actions: <Widget>[
                                TextButton(
                                  child: Text('OK'),
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                ),
                              ],
                            ),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        shape: CircleBorder(),
                        primary: Colors.white,
                        fixedSize: Size(20, 20),
                      ),
                      child: Icon(
                        Icons.outlined_flag,
                        color: Colors.red,
                        size: 20.0,
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        showDatePicker(
                          context: context,
                          initialDate: DateTime.now(),
                          firstDate: DateTime.now(),
                          lastDate: DateTime.now().add(Duration(days: 365)),
                          helpText: 'How long would you like to ban this user?',
                          confirmText: 'Confirm',
                          cancelText: 'Cancel',
                        ).then((date) {
                          setState(() {
                            BanDuration = date ?? DateTime.now();
                            debugPrint(BanDuration.toString());
                          });
                        });
                      },
                      style: ElevatedButton.styleFrom(
                        shape: CircleBorder(),
                        primary: Colors.white,
                        fixedSize: Size(20, 20),
                      ),
                      child: Icon(
                        Icons.block,
                        color: Colors.red,
                        size: 20.0,
                      ),
                    )
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Text(
                      'Tweets\n0',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xff9e9e9e)),
                    ),
                    Text(
                      'Likes\n0',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xff9e9e9e)),
                    ),
                    Text(
                      'Followers\n0',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xff9e9e9e)),
                    ),
                    Text(
                      'Following\n0',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xff9e9e9e)),
                    ),
                    Text(
                      'Reports\n0',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.red),
                    ),
                  ],
                ),
              ],
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: <Widget>[
                    _tweet(
                      embedded: GridView.count(
                        crossAxisCount: 2,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        crossAxisSpacing: 5,
                        mainAxisSpacing: 5,
                        children: [
                          GestureDetector(
                            child: Image(
                              image: NetworkImage(
                                  'https://i.kym-cdn.com/photos/images/newsfeed/001/839/575/d69.jpg'),
                              fit: BoxFit.fitWidth,
                              width: 40,
                              height: double.infinity,
                            ),
                            onTap: () {
                              showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  backgroundColor: Colors.black54,
                                  content: Image(
                                    image: NetworkImage(
                                        'https://i.kym-cdn.com/photos/images/newsfeed/001/839/575/d69.jpg'),
                                    fit: BoxFit.fitWidth,
                                    width: 1000,
                                    height: double.infinity,
                                  ),
                                ),
                              );
                            },
                          ),
                          GestureDetector(
                            child: Image(
                              image: NetworkImage(
                                  'https://i.kym-cdn.com/photos/images/newsfeed/001/839/575/d69.jpg'),
                              fit: BoxFit.fitWidth,
                              width: 40,
                              height: double.infinity,
                            ),
                            onTap: () {
                              showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  backgroundColor: Colors.black54,
                                  content: Image(
                                    image: NetworkImage(
                                        'https://i.kym-cdn.com/photos/images/newsfeed/001/839/575/d69.jpg'),
                                    fit: BoxFit.fitWidth,
                                    width: 1000,
                                    height: double.infinity,
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                    _tweet(
                      embedded: null,
                    ),
                    _tweet(
                      embedded: _tweet(embedded: null),
                      reTweet: true,
                    ),
                    _tweet(
                      embedded: null,
                    ),
                  ],
                ),
              ),
            ]),
          ),
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        color: const Color(0xffffffff),
        child: Container(
          margin: const EdgeInsets.only(left: 30.0, right: 30.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              IconButton(
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => HomePage()));
                },
                icon: Icon(Icons.home),
                iconSize: 35,
              ),
              const IconButton(
                onPressed: null,
                icon: Icon(Icons.search),
                iconSize: 35,
              ),
              const IconButton(
                onPressed: null,
                icon: Icon(Icons.notifications_active),
                iconSize: 35,
              )
            ],
          ),
        ),
      ),
    );
  }
}
